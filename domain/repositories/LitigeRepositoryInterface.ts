import { Litige, LitigeResponse } from "../../types/Litige";

export interface LitigeRepositoryInterface {
    createLitigeRequest(data: Litige, token: string): Promise<LitigeResponse>;
}
