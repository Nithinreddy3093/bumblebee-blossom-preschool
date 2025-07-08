import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';

const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    email: '',
    phone: '',
    childAge: '',
    program: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a server
    toast({
      title: "Message Sent! 🐝",
      description: "Thank you for your interest! We'll buzz back to you within 24 hours.",
    });
    setFormData({
      parentName: '',
      childName: '',
      email: '',
      phone: '',
      childAge: '',
      program: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      info: '9626033888',
      description: 'Mon-Fri, 8:00 AM - 5:00 PM'
    },
    {
      icon: Mail,
      title: 'Email Us',
      info: 'hello@bumblebeepreschool.com',
      description: 'We respond within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      info: 'Vellore, Tamil Nadu, India',
      description: 'Schedule a tour anytime'
    },
    {
      icon: Clock,
      title: 'School Hours',
      info: '8:00 AM - 1:00 PM',
      description: 'Monday to Friday'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-nature">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-baloo font-bold text-primary mb-6">
            Contact Us 📞
          </h1>
          <p className="text-xl md:text-2xl font-comic text-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to join our buzzing community? We'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="shadow-nature border-0 bg-card/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-baloo font-bold text-3xl text-primary text-center">
                Join Our Hive! 🐝
              </CardTitle>
              <p className="font-comic text-center text-foreground">
                Fill out the form below and we'll get back to you soon
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-comic font-medium text-foreground mb-2">
                      Parent's Name *
                    </label>
                    <Input
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                      className="font-comic border-2 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-comic font-medium text-foreground mb-2">
                      Child's Name *
                    </label>
                    <Input
                      name="childName"
                      value={formData.childName}
                      onChange={handleInputChange}
                      placeholder="Your child's name"
                      required
                      className="font-comic border-2 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-comic font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      className="font-comic border-2 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-comic font-medium text-foreground mb-2">
                      Phone Number *
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="9626033888"
                      required
                      className="font-comic border-2 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-comic font-medium text-foreground mb-2">
                      Child's Age
                    </label>
                    <select
                      name="childAge"
                      value={formData.childAge}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-border rounded-lg font-comic focus:border-primary focus:outline-none bg-background"
                    >
                      <option value="">Select age</option>
                      <option value="1-2">1-2 years</option>
                      <option value="2-3">2-3 years</option>
                      <option value="3-4">3-4 years</option>
                      <option value="4-5">4-5 years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-comic font-medium text-foreground mb-2">
                      Program Interest
                    </label>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-border rounded-lg font-comic focus:border-primary focus:outline-none bg-background"
                    >
                      <option value="">Select program</option>
                      <option value="playgroup">Playgroup</option>
                      <option value="nursery">Nursery</option>
                      <option value="pre-kg">Pre-KG</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-comic font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your child's interests, any questions you have, or schedule a visit..."
                    rows={4}
                    className="font-comic border-2 focus:border-primary"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-primary font-comic font-bold text-lg py-6 hover:scale-105 transition-transform shadow-glow"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="grid gap-6">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Card 
                    key={index}
                    className="group hover:shadow-glow transition-all duration-300 hover:scale-105 border-0 bg-card/90 backdrop-blur-sm"
                  >
                    <CardContent className="flex items-center space-x-4 p-6">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center group-hover:animate-wiggle">
                        <IconComponent className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-baloo font-bold text-lg text-primary">
                          {item.title}
                        </h3>
                        <p className="font-comic font-medium text-foreground">
                          {item.info}
                        </p>
                        <p className="font-comic text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Map Placeholder */}
            <Card className="shadow-nature border-0 bg-card/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-baloo font-bold text-xl text-primary mb-4 text-center">
                  Find Us Here 🗺️
                </h3>
                <div className="bg-gradient-nature h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📍</div>
                    <p className="font-comic text-foreground">
                      Interactive map coming soon!
                    </p>
                    <p className="font-comic text-sm text-muted-foreground mt-2">
                      Located in the heart of Vellore
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact CTA */}
            <Card className="bg-gradient-primary shadow-glow border-0">
              <CardContent className="p-6 text-center">
                <h3 className="font-baloo font-bold text-2xl text-primary-foreground mb-3">
                  Ready for a Visit? 🚀
                </h3>
                <p className="font-comic text-primary-foreground mb-4">
                  See our facilities and meet our caring team!
                </p>
                <Button 
                  asChild
                  className="bg-card text-primary font-comic font-bold hover:scale-105 transition-transform"
                >
                  <a href="tel:9626033888">Call Now: 9626033888</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;