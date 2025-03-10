package user

import (
	"github.com/gin-gonic/gin"
	"github.com/gogofly/modules/core/base"
)

type UserService struct {
	base.BaseService
	dao *UserDao
}

var userService *UserService

func NewService() *UserService {
	if userService == nil {
		userService = &UserService{
			dao: NewDao(),
		}
	}

	return userService
}

func (us *UserService) FindList(ctx *gin.Context) {
	
}