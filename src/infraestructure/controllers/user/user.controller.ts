import { Body, Controller, Post, Put, UsePipes } from '@nestjs/common';
import { SigninDto } from 'src/domain/user/dtos/signin.dto';
import { SignupDto } from 'src/domain/user/dtos/signup.dto';
import { UserNotFoundException } from 'src/infraestructure/exceptions/user-exceptions';
import { CustomValidationPipe } from 'src/infraestructure/pipes/validation.pipe';
import { UserService } from 'src/infraestructure/services/user/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UsePipes(new CustomValidationPipe())
    async signin(@Body() { username, password }: SigninDto) {
        try {
            const user = await this.userService.findOne({
                username,
                email: username,
                password,
            });
            return user;
        } catch {
            throw new UserNotFoundException();
        }
    }

    @Post('/signup')
    @UsePipes(new CustomValidationPipe())
    signup(@Body() user: SignupDto) {
        return this.userService.create(user);
    }
}
