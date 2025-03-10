package user

import (
	"github.com/gin-gonic/gin"
	"github.com/gogofly/global"
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
	// 上传头像

	avatarInfo, err := uc.FromFileUploadAvatar(ctx, "file")
	if(err!= nil){
		global.Logger.Errorf("上传头像失败: %v", err)
		uc.FailWithBadRequest(ctx, "上传头像失败")
		return
	}
	
	if uc.ParseDto(ctx, &data) {		
		uc.TryCatchWithStatus(ctx, func() (any, int, error) {
			if avatarInfo != nil {
				data.Avatar = avatarInfo.FullName
			}
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