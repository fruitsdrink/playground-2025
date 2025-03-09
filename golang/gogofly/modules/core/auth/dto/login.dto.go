package dto

type LoginDto struct {
	Username string `form:"username" json:"username" binding:"not_empty" message:"用户名不能为空"`
	Password string `form:"password" json:"password" binding:"not_empty" message:"密码不能为空"`
}