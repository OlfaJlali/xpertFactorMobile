import { Contract } from '../entities/Contract';
import { ContractRepositoryInterface } from '../repositories/ContractRepositoryInterface';

export class GetContractsUseCase {
  private contractRepository: ContractRepositoryInterface;

  constructor(contractRepository: ContractRepositoryInterface) {
    this.contractRepository = contractRepository;
  }

  async execute(identifier: string , token: string): Promise<Contract[]> {
    return this.contractRepository.getContracts(identifier, token);
  }
}
