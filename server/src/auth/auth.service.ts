import { Injectable } from '@nestjs/common';
import { prismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (private prisma :prismaService){}

    async register(data:RegisterDto){
        const hashedPassword = await bcrypt.hash(data.password,10)

        const user= await this.prisma.user.create({
        data:{
            email:data.email,
            password:hashedPassword,
            name:data.name
        }
    })

    return{
            id:user.id,
            email:user.email,
            name:user.name
    }
    
    }


}
