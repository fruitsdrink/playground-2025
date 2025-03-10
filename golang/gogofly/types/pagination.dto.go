package types

type PaginationDto struct {
	Page     int `form:"page" json:"page" uri:"page" default:"1""`
	Size int `form:"size" json:"size" uri:"size" default:"10"`
}

func (p *PaginationDto) GetPage() int {
	if p.Page <=0 {
		p.Page = 1
	}

	return p.Page
}

func (p *PaginationDto) GetSize() int {
	if p.Size <=0 {
		p.Size = 10
	}

	return p.Size
}
func (p *PaginationDto) GetOffset() int {
	return (p.GetPage() - 1) * p.GetSize()
}