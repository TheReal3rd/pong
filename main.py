def padelCollision():
    global ballColTimeout
    if padel2.y < 6:
        padel2.y = 5
    else:
        if padel2.y > scene.screen_height():
            padel2.y = scene.screen_height()
    if padel1.y < 6:
        padel1.y = 5
    else:
        if padel1.y > scene.screen_height():
            padel1.y = scene.screen_height()
    if ballColTimeout <= 0:
        if padel1.overlaps_with(ball):
            ball.vx += ball.vx * -2
            ballColTimeout = 10
        if padel2.overlaps_with(ball):
            ball.vx += ball.vx * -2
            ballColTimeout = 10
    else:
        ballColTimeout += -1
def reset():
    ball.set_velocity(randomVel(), randomVel())
    ball.set_position(scene.screen_width() / 2, scene.screen_height() / 2)
    padel1.set_position(10, 56)
    padel2.set_position(150, 56)
def randomVel():
    if randint(0, 1) == 0:
        return 50
    else:
        return -50
ballColTimeout = 0
ball: Sprite = None
padel2: Sprite = None
padel1: Sprite = None
padel1 = sprites.create(assets.image("""
    myImage
"""), SpriteKind.player)
padel2 = sprites.create(assets.image("""
    myImage
"""), SpriteKind.player)
padel1.set_position(10, 56)
padel2.set_position(150, 56)
ball = sprites.create(assets.image("""
    myImage0
"""), SpriteKind.player)
ball.set_velocity(randomVel(), randomVel())

def on_forever():
    if ball.y <= 0:
        ball.vy += ball.vy * -2
    if ball.y >= scene.screen_height():
        ball.vy += ball.vy * -2
    if ball.x <= 0:
        reset()
        print("Hit left side")
        info.player1.change_score_by(1)
    if ball.x >= scene.screen_width():
        reset()
        print("Hit right side")
        info.player2.change_score_by(1)
    if controller.A.is_pressed():
        padel2.y += -5
    if controller.B.is_pressed():
        padel2.y += 5
    if controller.up.is_pressed():
        padel1.y += -5
    if controller.down.is_pressed():
        padel1.y += 5
    padelCollision()
forever(on_forever)
