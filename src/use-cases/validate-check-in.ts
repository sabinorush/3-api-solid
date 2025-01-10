   import { CheckInsRepository } from "@/repositories/check-ins-repository";
   import { CheckIn } from "@prisma/client";
   import { ResourceNotFoundError } from "./errors/resource-not-found";
   
   interface ValidateCheckInUseCaseRequest {
    checkInID: string
   }
   
   
   interface ValidateCheckInUseCaseResponse {
     checkIn: CheckIn
   }
   
   export class ValidateCheckInUseCase {
     constructor(private checkInsRepository: CheckInsRepository) { }
   
     async execute({
      checkInID
     }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
       const checkIn = await this.checkInsRepository.findById(checkInID)
   
       if (!checkIn) {
         throw new ResourceNotFoundError()
       }
   
        checkIn.validated_at = new Date()

        await this.checkInsRepository.save(checkIn)
   
       return {
         checkIn,
       }
     }
   }