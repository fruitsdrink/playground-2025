package auth

import (
	"errors"

	"github.com/gogofly/modules/core/auth/dto"
	"github.com/gogofly/modules/core/base"
	"github.com/gogofly/utils"
)

var authService *AuthService
type AuthService struct{
	base.BaseService
	dao *AuthDao
}

func NewService() *AuthService {
	if authService == nil {
		authService = &AuthService{
			dao: NewDao(),
		}
	}
	return authService
}
func (as *AuthService) Login(loginDto dto.LoginDto) (dto.LoginResponse, error){
	username, password := loginDto.Username, loginDto.Password
	user := as.dao.FindByUserName(username)
	result := dto.LoginResponse{}
	if user.Id == 0 {
		return result, errors.New("用户不存在")
	}

	if err := utils.CheckPassword(password, user.Password); err != nil {
		return result, errors.New("密码错误")
	}

	token, err := as.signToken(user.Id, user.UserName)
	if err != nil {
		return result, errors.New("生成token失败")
	}
	result.Token = token
	return result, nil
}

// 生成token
func (as *AuthService) signToken(userId uint, userName string) (string, error) {
	return utils.JwtTools.GenerateToken(userId, userName)
}
