import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../core/shared/core.service';
import { SecurityService } from '../../security/shared/security.service';
import { DanpheHTTPResponse } from '../../shared/common-models';
import { RouteFromService } from '../../shared/routefrom.service';
import { GovInsuranceService } from './shared/ins-service';
import { GovInsuranceBlService } from './shared/insurance.bl.service';
@Component({
  selector: 'app-insurance',
  templateUrl: './gov-insurance-main.component.html',
  styleUrls: ['./gov-insurance-main.component.css']
})
export class InsuranceComponent implements OnInit {

  public currentCounter: number = null;
  validRoutes: any;
  public primaryNavItems: Array<any> = null;
  public secondaryNavItems: Array<any> = null;
  constructor(public securityService: SecurityService,
    public routeFromService: RouteFromService,
    public insuranceBlService: GovInsuranceBlService,
    public insuranceService: GovInsuranceService,
    public coreService: CoreService) {
    // get the chld routes of Settings from valid routes available for this user.
    this.validRoutes = this.securityService.GetChildRoutes('GovInsurance');
    this.primaryNavItems = this.validRoutes.filter(a => a.IsSecondaryNavInDropdown == null || a.IsSecondaryNavInDropdown == 0);
    this.secondaryNavItems = this.validRoutes.filter(a => a.IsSecondaryNavInDropdown == 1);
    this.currentCounter = this.securityService.getLoggedInCounter().CounterId;
    if (this.currentCounter < 1) {
      this.routeFromService.RouteFrom = '/Insurance/Patient';
    }
    else {
      this.LoadDoctorAndDeptPricesToinsuranceService();
      this.LoadAllBillingItems();
    }
  }
  ngOnInit() {
  }
  async LoadDoctorAndDeptPricesToinsuranceService() {

    if (this.insuranceService.DocFollowupPrices && this.insuranceService.DocFollowupPrices.length == 0) {
      this.insuranceBlService.GetDoctorFollowupItems()
        .subscribe((res: DanpheHTTPResponse) => {
          if (res.Status == "OK") {
            this.insuranceService.DocFollowupPrices = res.Results;
          }
        });
    }

    this.insuranceBlService.GetDepartmentFollowupItems()
      .subscribe((res: DanpheHTTPResponse) => {
        if (res.Status == "OK") {
          this.insuranceService.DeptFollowupPrices = res.Results;
        }
      });

    this.insuranceBlService.GetDoctorOpdPrices()
      .subscribe((res: DanpheHTTPResponse) => {
        if (res.Status == "OK") {
          this.insuranceService.DocOpdPrices = res.Results;
        }
      });

    this.insuranceBlService.GetDepartmentOpdItems()
      .subscribe((res: DanpheHTTPResponse) => {
        if (res.Status == "OK") {
          this.insuranceService.DeptOpdPrices = res.Results;
        }
      });

    //sud: 31Jul'19-For Old Patient Opd
    this.insuranceBlService.GetDepartmentOldPatientPrices()
      .subscribe((res: DanpheHTTPResponse) => {
        if (res.Status == "OK") {
          this.insuranceService.DeptOpdPrice_OldPatient = res.Results;
        }
      });
    //sud: 31Jul'19-For Old Patient Opd
    this.insuranceBlService.GetDoctorOldPatientPrices()
      .subscribe((res: DanpheHTTPResponse) => {
        if (res.Status == "OK") {
          this.insuranceService.DocOpdPrice_OldPatient = res.Results;
        }
      });

    this.insuranceBlService.GetDepartment()
      .subscribe((res: DanpheHTTPResponse) => {
        if (res.Status == "OK") {
          this.insuranceService.ApptApplicableDepartmentList = res.Results;
          this.insuranceService.ApptApplicableDepartmentList = this.coreService.Masters.Departments.filter(d => d.IsAppointmentApplicable == true && d.IsActive == true).map(d => {
            return {
              DepartmentId: d.DepartmentId,
              DepartmentName: d.DepartmentName
            };
          });
        }

      });

    //DepartmentData is already available, so re-use it..

    this.insuranceService.ApptApplicableDepartmentList = await this.coreService.Masters.Departments.filter(d => d.IsAppointmentApplicable == true && d.IsActive == true).map(d => {
      return {
        DepartmentId: d.DepartmentId,
        DepartmentName: d.DepartmentName
      };
    });

    //check if we can get employee data also from pre-loaded masters.
    this.insuranceBlService.GetVisitDoctors()
      .subscribe((res: DanpheHTTPResponse) => {
        if (res.Status == "OK") {
          this.insuranceService.ApptApplicableDoctorsList = res.Results;
        }
      });
  }
  //we have to load all billing items into service variable, which will be used across this module. 
  public LoadAllBillingItems() {
    this.insuranceBlService.GetBillItemList()
      .subscribe((res: DanpheHTTPResponse) => {
        if (res.Status == "OK") {
          console.log("bill item prices are loaded successfully (Insurance-main).");
          this.insuranceService.LoadAllBillItemsPriceList(res.Results);
        }
        else {
          console.log("Couldn't load bill item prices. (Insurance-main)");
        }
      });
  }

}
