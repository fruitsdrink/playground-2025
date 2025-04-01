package dto

import "github.com/gogofly/model/system"

type UserResponse struct {
	Id uint `json:"id"`
	UserName string `json:"userName"`
	RealName string `json:"realName"`
	Email string `json:"email"`
	Avatar string `json:"avatar"`
	Phone string `json:"phone"`
	Status uint `json:"status"`
}

func (ur *UserResponse) FillModel(model *system.User)  {
	ur.Id = model.Id
	ur.UserName = model.UserName
	ur.RealName = model.RealName
	ur.Email = model.Email
	ur.Avatar = model.Avatar
	ur.Phone = model.Phone
	ur.Status = model.Status
}