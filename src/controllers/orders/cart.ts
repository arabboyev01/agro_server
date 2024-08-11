import { createCArtorders, gupdateCArtorders, getArtorders, delArtorders } from "../../routes/orders/cart"
import { Router } from "express"
import { auth } from "../../auth"

const Card = Router()

Card.post("/", auth, createCArtorders)
Card.patch("/:id", auth, gupdateCArtorders)
Card.get("/", auth, getArtorders)
Card.delete("/:id", auth, delArtorders)

export default Card