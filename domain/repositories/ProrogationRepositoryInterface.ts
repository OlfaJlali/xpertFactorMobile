import { Prorogation, ProrogationResponse } from "../../types/Prorogation";

export interface ProrogationRepositoryInterface {
    createProrogationRequest(data: Prorogation, token: string): Promise<ProrogationResponse>;
}
