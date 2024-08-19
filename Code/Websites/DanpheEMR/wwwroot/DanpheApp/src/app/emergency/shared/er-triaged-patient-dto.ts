import { EmergencyPatientCases_DTO } from "./er-patient-case.dto";

export class EmergencyTriagedPatient_DTO {
    public ERPatientId: number;
    public ERPatientNumber: number;
    public PatientId: number;
    public PatientVisitId: number;
    public PatientCode: string;
    public VisitDateTime: string;
    public FirstName: string;
    public MiddleName: string;
    public LastName: string;
    public Gender: string;
    public Age: string;
    public AgeSex: string;
    public DateOfBirth: string;
    public ContactNo: string;
    public Address: string;
    public ReferredBy: string;
    public ReferredTo: string;
    public Case: string;
    public ConditionOnArrival: string;
    public ModeOfArrival: number;
    public ModeOfArrivalName: string;
    public CareOfPerson: string;
    public ERStatus: string;
    public TriageCode: string;
    public TriagedBy: number;
    public TriagedOn: string;
    public CreatedBy: number;
    public CreatedOn: string;
    public ModifiedBy: number;
    public ModifiedOn: string;
    public IsActive: boolean;
    public OldPatientId: string;
    public IsExistingPatient: boolean;
    public FullName: string;
    public CountryId: number;
    public CountrySubDivisionId: number;
    public TriagedByName: string;
    public ProviderName: string;
    public ProviderId: number;
    public SchemeId: number;
    public PriceCategoryId: number;
    public PatientCases = new EmergencyPatientCases_DTO();
    public PerformerName: string;
    public SchemeName: string;
    public PriceCategoryName: string;
}