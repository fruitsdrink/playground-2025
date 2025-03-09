package auth

import (
	"github.com/gin-gonic/gin"
	"github.com/gogofly/modules/core/auth/dto"
	"github.com/gogofly/modules/core/base"
)

type AuthService struct{
	base.BaseService
}

func NewService() *AuthService {
	return &AuthService{}
}
func (as *AuthService) Login(ctx *gin.Context, loginDto dto.LoginDto){
	as.OK(ctx, loginDto)
}
