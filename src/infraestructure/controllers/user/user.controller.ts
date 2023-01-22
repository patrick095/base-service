import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    Put,
    UsePipes,
} from '@nestjs/common';
import { refreshTokenDTO } from 'src/domain/user/dtos/refresh-token.dto';
import { SigninDto } from 'src/domain/user/dtos/signin.dto';
import { SignupDto } from 'src/domain/user/dtos/signup.dto';
import { UpdatePasswordDto } from 'src/domain/user/dtos/update-password.dto';
import { UpdateDto } from 'src/domain/user/dtos/update.dto';
import {
    UserNotFoundException,
    UserNotRegisteredException,
    UserNotUpdatedException,
} from 'src/infraestructure/exceptions/user-exceptions';
import { CustomValidationPipe } from 'src/infraestructure/pipes/validation.pipe';
import { TokenService } from 'src/infraestructure/services/token/token.service';
import { UserService } from 'src/infraestructure/services/user/user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
    ) {}

    @Get('/signin')
    @UsePipes(new CustomValidationPipe())
    async signin(@Body() { username, password }: SigninDto) {
        const user = await this.userService.findOne({
            username,
            email: username,
            password,
        });

        const token = this.tokenService.generateToken(user._id);

        return {
            user,
            token,
        };
    }

    @Post('/signup')
    @UsePipes(new CustomValidationPipe())
    async signup(@Body() user: SignupDto) {
        try {
            const newUser = await this.userService.create(user);

            const token = this.tokenService.generateToken(newUser._id);

            return {
                user: newUser,
                token,
            };
        } catch {
            throw new UserNotRegisteredException();
        }
    }

    @Put('/update')
    @UsePipes(new CustomValidationPipe())
    update(@Body() user: UpdateDto) {
        try {
            return this.userService.update(user);
        } catch {
            throw new UserNotUpdatedException();
        }
    }

    @Patch('/update-password')
    @UsePipes(new CustomValidationPipe())
    updatePassword(@Body() { id, oldPass, newPass }: UpdatePasswordDto) {
        return this.userService.updatePassword(id, oldPass, newPass);
    }

    @Get('/refresh-token')
    @UsePipes(new CustomValidationPipe())
    refreshToken(@Body() { token }: refreshTokenDTO) {
        return this.tokenService.refreshToken(token);
    }
}
