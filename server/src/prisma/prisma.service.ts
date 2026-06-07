import { OnModuleDestroy,OnModuleInit,Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client/extension";

@Injectable()
export class prismaService extends PrismaClient implements OnModuleDestroy,OnModuleInit{

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

}