package user

import (
	"github.com/gin-gonic/gin"
	"github.com/gogofly/modules/core/base"
)

type UserService struct {
	base.BaseService
}

func NewService() *UserService {
	return &UserService{}
}

func (us *UserService) FindList(ctx *gin.Context) {
	
}