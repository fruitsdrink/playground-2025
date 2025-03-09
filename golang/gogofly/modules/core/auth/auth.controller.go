package auth

import (
	"github.com/gin-gonic/gin"
)

type AuthController struct{
	service *AuthService

}

func NewController() *AuthController {
	return &AuthController{
		service: NewService(),
	}
}

func (ac *AuthController) Login(ctx *gin.Context) {
	ac.service.Login(ctx)
}

