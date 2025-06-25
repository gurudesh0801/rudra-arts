exports.getServices = (req, res) => {
    res.json([
      { name: "Custom Artworks", description: "Personalized paintings and decor." },
      { name: "Workshops", description: "Offline and online art workshops." },
      { name: "Bulk Orders", description: "Art pieces for events, corporates, and gifting." }
    ])
}