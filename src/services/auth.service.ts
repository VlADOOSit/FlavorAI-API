import { prisma } from '../config/db';
import { RegisterDto } from '../dtos/auth.dto';
import bcrypt from 'bcrypt';

export class AuthService {
    static async createUser(dto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        return prisma.user.create({
            data: { email: dto.email, password:hashedPassword, username: dto.username },
        });
    }

    static async findUserByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    static async comparePassword(plain: string, hashed: string) {
        return bcrypt.compare(plain, hashed);
    }
}
