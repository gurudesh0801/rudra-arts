exports.getAbout = (req,res) => {
    res.json({
      name: "Rudra Arts",
      description: "Rudra Arts is a creative space for handcrafted art and cultural expression, located in New Sangvi, Pune.",
      founder: "Satyajeet Vaidya",
      mission: "Promoting traditional art in modern forms."
    })
}