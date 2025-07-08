import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, Star, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import IntroVideo from '@/components/IntroVideo';
import BeeAnimation from '@/components/BeeAnimation';
import SoundToggle from '@/components/SoundToggle';
import beeLogo from '@/assets/bee-logo.png';
import natureBackground from '@/assets/nature-background.png';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const visited = localStorage.getItem('bumblebee-visited');
    if (visited) {
      setShowIntro(false);
      setHasVisited(true);
    }
  }, []);

  const handleIntroComplete = () => {
    localStorage.setItem('bumblebee-visited', 'true');
    setShowIntro(false);
    setHasVisited(true);
  };

  const features = [
    {
      icon: Heart,
      title: 'Loving Care',
      description: 'Individual attention for every little bee in our hive'
    },
    {
      icon: BookOpen,
      title: 'Play-Based Learning',
      description: 'Learning through fun activities and exploration'
    },
    {
      icon: Users,
      title: 'Small Class Sizes',
      description: 'Ensuring personalized attention for all children'
    },
    {
      icon: Star,
      title: 'Qualified Teachers',
      description: 'Experienced educators passionate about early childhood'
    }
  ];

  const programs = [
    { name: 'Playgroup', age: '1.5-2.5 years', emoji: '🐣', color: 'bg-flower-pink/20 border-flower-pink' },
    { name: 'Nursery', age: '2.5-3.5 years', emoji: '🐛', color: 'bg-leaf-green/20 border-leaf-green' },
    { name: 'Pre-KG', age: '3.5-4.5 years', emoji: '🐝', color: 'bg-primary/20 border-primary' }
  ];

  if (showIntro && !hasVisited) {
    return <IntroVideo onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-nature">
      <Navbar />
      <BeeAnimation soundEnabled={soundEnabled} />
      <SoundToggle soundEnabled={soundEnabled} onToggle={setSoundEnabled} />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${natureBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-nature/80"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Floating bee logo */}
            <div className="mb-8 animate-float">
              <img 
                src={beeLogo} 
                alt="Bumblebee Preschool" 
                className="w-32 h-32 mx-auto drop-shadow-lg hover:animate-wiggle"
              />
            </div>
            
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-baloo font-bold text-primary mb-6 animate-fade-in">
              Bumblebee Preschool
            </h1>
            
            <div className="text-2xl md:text-4xl lg:text-5xl font-comic font-bold text-foreground mb-8 space-y-2">
              <div className="animate-bounce-gentle">Play! 🌻</div>
              <div className="animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>Grow! 🌿</div>
              <div className="animate-bounce-gentle" style={{ animationDelay: '1s' }}>Blossom! 🌸</div>
            </div>
            
            <p className="text-xl md:text-2xl font-comic text-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Where little minds discover the joy of learning in a nurturing, nature-inspired environment
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                size="lg"
                className="bg-gradient-primary font-comic font-bold text-xl px-8 py-6 hover:scale-105 transition-transform shadow-glow animate-glow"
              >
                <Link to="/contact">
                  Join Our Hive! 🐝
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="font-comic font-bold text-xl px-8 py-6 border-2 border-primary bg-card/90 hover:bg-primary/10 hover:scale-105 transition-all"
              >
                <Link to="/programs">
                  Explore Programs
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 text-4xl animate-float">🌻</div>
          <div className="absolute top-32 right-16 text-3xl animate-float" style={{ animationDelay: '1s' }}>🌸</div>
          <div className="absolute bottom-40 left-20 text-5xl animate-float" style={{ animationDelay: '2s' }}>🦋</div>
          <div className="absolute bottom-20 right-10 text-4xl animate-float" style={{ animationDelay: '0.5s' }}>🌺</div>
          <div className="absolute top-64 left-1/4 text-3xl animate-float" style={{ animationDelay: '1.5s' }}>🌼</div>
          <div className="absolute top-80 right-1/3 text-4xl animate-float" style={{ animationDelay: '2.5s' }}>🐝</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-baloo font-bold text-primary mb-6">
            Why Choose Our Hive? 🏠
          </h2>
          <p className="text-xl font-comic text-foreground max-w-3xl mx-auto">
            We provide a safe, nurturing environment where children can explore, learn, and grow
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-glow transition-all duration-500 hover:scale-105 border-0 bg-card/90 backdrop-blur-sm"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-wiggle">
                    <IconComponent className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="font-baloo font-bold text-2xl text-primary mb-4">
                    {feature.title}
                  </h3>
                  <p className="font-comic text-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-20 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-baloo font-bold text-primary mb-6">
              Our Programs 📚
            </h2>
            <p className="text-xl font-comic text-foreground max-w-3xl mx-auto">
              Age-appropriate programs designed to nurture every stage of development
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {programs.map((program, index) => (
              <Card 
                key={index}
                className={`group hover:shadow-glow transition-all duration-500 hover:scale-105 border-2 ${program.color} backdrop-blur-sm`}
              >
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4 group-hover:animate-bounce-gentle">
                    {program.emoji}
                  </div>
                  <h3 className="font-baloo font-bold text-2xl text-primary mb-2">
                    {program.name}
                  </h3>
                  <p className="font-comic text-lg text-accent-foreground font-medium">
                    {program.age}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-primary font-comic font-bold text-lg px-8 py-4 hover:scale-105 transition-transform"
            >
              <Link to="/programs">
                View All Programs
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 container mx-auto px-4">
        <Card className="bg-gradient-primary shadow-glow border-0 max-w-4xl mx-auto">
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-6 animate-bounce-gentle">🌟</div>
            <h2 className="text-4xl md:text-5xl font-baloo font-bold text-primary-foreground mb-6">
              Ready to Start the Journey?
            </h2>
            <p className="text-xl font-comic text-primary-foreground mb-8 max-w-2xl mx-auto">
              Join our buzzing community of learners and watch your little one blossom!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="bg-card text-primary font-comic font-bold text-lg px-8 py-4 hover:scale-105 transition-transform"
              >
                <Link to="/contact">Schedule a Visit</Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-card text-card font-comic font-bold text-lg px-8 py-4 hover:bg-card/10 hover:scale-105 transition-all"
              >
                <Link to="/gallery">View Gallery</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact Info Footer */}
      <section className="py-12 bg-card/90 backdrop-blur-sm border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📞</span>
              <a 
                href="tel:9626033888" 
                className="font-comic text-lg text-primary hover:text-primary/80 transition-colors"
              >
                9626033888
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📍</span>
              <span className="font-comic text-lg text-foreground">
                Vellore, Tamil Nadu, India
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⏰</span>
              <span className="font-comic text-lg text-foreground">
                Mon-Fri: 8:00 AM - 1:00 PM
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;