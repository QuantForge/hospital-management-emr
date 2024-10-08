﻿export class BillItemRequisition {
    public BillItemRequisitionId: number = 0;
    public PatientId: number = null;
    public ServiceDepartmentId: number = null;
    public ItemId: number = null;
    public ItemName: string = null;
    public Quantity: number = null;
    public RequisitionId: number = null;
    public ProcedureCode: string = null;
    public PatientVisitId: number = null;
    public DepartmentName: string = null;
    public ServiceDepartment: string = null;
    public PerformerId: number = null; // Krishna, 15th,jun'22, changed ProviderId to PerformerId.
    public CreatedBy: number = 0;
    public CreatedOn: string = null;
    public Price: number = null;
    public AssignedTo: number = null;
}