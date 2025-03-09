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

func NewController() *AuthController {
	return &AuthController{
		service: NewService(),
	}
}

func (ac *AuthController) Login(ctx *gin.Context) {
	var loginDto dto.LoginDto
	if ac.ParseDto(ctx, &loginDto) {
		ac.service.Login(ctx, loginDto)
	}
}

