class Drag {
  private pageX: number
  private pageY: number
  private body?: HTMLBodyElement

  constructor() {
    this.pageX = 0
    this.pageY = 0
  }

  public start(): void {
    window.addEventListener('DOMContentLoaded', () => {
      this.body = document.querySelector('body')!
      this.body.addEventListener('mousedown', this.mouseDown.bind(this))
    })
  }
  private mouseDown(event: MouseEvent): void {
    this.pageX = event.pageX
    this.pageY = event.pageY
    const mouseMoveEvent = this.mouseMove.bind(this)

    this.body!.addEventListener('mousemove', mouseMoveEvent)
    this.body?.addEventListener('mouseup', () => {
      this.body?.removeEventListener('mousemove', mouseMoveEvent)
    })
    this.body?.addEventListener('mouseout', () => {
      this.body?.removeEventListener('mousemove', mouseMoveEvent)
    })
  }
  private mouseMove(event: MouseEvent): void {
    const x = event.pageX - this.pageX
    const y = event.pageY - this.pageY

    window.api.drag({ x, y })
  }
}
export const useDrag = (): { drag: Drag } => {
  const drag = new Drag()
  return {
    drag
  }
}
