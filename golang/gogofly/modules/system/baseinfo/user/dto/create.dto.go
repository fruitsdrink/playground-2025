package dto

import (
	"github.com/gogofly/model/system"
)

type CreateUserDto struct{
	UserName string `json:"username" form:"username" binding:"required" message:"用户名不能为空"`
	Password string `json:"password" form:"password" binding:"required" message:"密码不能为空"`
	RealName string `json:"realName" form:"realName"`
	Email string `json:"email" form:"email"`
	Phone string `json:"phone" form:"phone"`
	Status uint `json:"status" form:"status"`
}

func (d *CreateUserDto) ToModel() system.User {
	return system.User{
		UserName: d.UserName,
		Password: d.Password,
		RealName: d.RealName,
		Email: d.Email,
		Phone: d.Phone,
		Status: d.Status,
	}
}