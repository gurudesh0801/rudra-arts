const Contact = require("../models/Contact")

exports.submitContactForm = async(req, res) => {
    const {name, email, message} = req.body 
    try {
     const newContact = new Contact({name, email, message})
     await newContact.save()
     res.status(201).json({message: 'Message sent successfully!'})
    }
    catch(err){
     console.error(err)
     res.status(500).json({error: 'Failed to send message'})
    }
}