import { FinancementRequest, FinancementRequestResponse } from "../../types/Financement";

export interface FinancementRepositoryInterface {
    createFinancementRequest(data: FinancementRequest, token: string): Promise<FinancementRequestResponse>;
}
