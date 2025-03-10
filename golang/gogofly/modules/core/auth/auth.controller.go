package auth

import (
	"github.com/gin-gonic/gin"
	"github.com/gogofly/modules/core/auth/dto"
	"github.com/gogofly/modules/core/base"
)

type AuthController struct{
	base.BaseController
	service *AuthService
}

var authController *AuthController
func NewController() *AuthController {
	if authController == nil {
		authController = &AuthController{
			service: NewService(),
		}
	}
	return authController
}

func (ac *AuthController) Login(ctx *gin.Context) {
	var loginDto dto.LoginDto
	if ac.ParseDto(ctx, &loginDto) {
		ac.TryCatchWithStatus(ctx, func() (any, int, error) {
			result, err := ac.service.Login(loginDto)
			return result, 0, err
		})
	}
}

