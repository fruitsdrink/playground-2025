package baseinfo

type IUserApi struct{}

func newUserApi() *IUserApi {
	return &IUserApi{}
}

func (u *IUserApi) GetInfo() {}
