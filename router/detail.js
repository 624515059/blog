module.exports =  (req, res) => {
    console.log(req.params.id)
    console.log(req.body.id)
    res.send({ ok: 123 })
}