package user

import (
	"github.com/gin-gonic/gin"
	"github.com/gogofly/modules/core/base"
	"github.com/gogofly/modules/system/baseinfo/user/dto"
)

type UserController struct {
	base.BaseController
	service *UserService
}

var userController *UserController

func NewController() *UserController {
	if userController == nil {
		userController = &UserController{
			service: NewService(),
		}
	}
	return userController
}

func (uc *UserController) Create(ctx *gin.Context) {
	var data dto.CreateUserDto
	if uc.ParseDto(ctx, &data) {
		uc.TryCatchWithStatus(ctx, func() (any, int, error) {
			result, err := uc.service.Create(&data)
			return result, 0, err
		})
	}
}

func (uc *UserController) Update(ctx *gin.Context){
	id := uc.ParamUint(ctx, "id")
	var data dto.UpdateUserDto
	if uc.ParseDto(ctx, &data) {
		uc.TryCatchWithStatus(ctx, func() (any, int, error) {
			result, err := uc.service.Update(id, &data)
			return result, 0, err
		})
	}
}
func (uc *UserController) Delete(ctx *gin.Context) {
	id := uc.ParamUint(ctx, "id")
	uc.TryCatchWithStatus(ctx, func() (any, int, error) {
		err := uc.service.Delete(id)
		return nil, 0, err
	})
}

func (uc *UserController) FindOne(ctx *gin.Context) {
	id := uc.ParamUint(ctx, "id")
	uc.TryCatchWithStatus(ctx, func() (any, int, error) {
		result, err := uc.service.FindOne(id)
		return result, 0, err
	})
}
func (uc *UserController) FindList(ctx *gin.Context) {
	var data dto.FindUserListDto
	if uc.ParseDto(ctx, &data) {
		uc.TryCatchWithStatus(ctx, func() (any, int, error) {
			result, err := uc.service.FindList(&data)
			return result, 0, err
		})
	}
}