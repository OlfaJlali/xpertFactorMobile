import { Contract } from '../entities/Contract';

export interface ContractRepositoryInterface {
  getContracts(identifier: string, token: string): Promise<Contract[]>;
}
