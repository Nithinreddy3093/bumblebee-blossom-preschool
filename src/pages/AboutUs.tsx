import React from 'react';
import { Heart, Users, Leaf, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';

const AboutUs = () => {
  const values = [
    {
      icon: Heart,
      title: 'Love & Care',
      description: 'Every child is treated with unconditional love and individual attention in our nurturing environment.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We build strong relationships with families and create a supportive community for all our little bees.'
    },
    {
      icon: Leaf,
      title: 'Nature Learning',
      description: 'Children explore and learn through nature-based activities that foster curiosity and environmental awareness.'
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'We strive for excellence in early childhood education with qualified teachers and proven methodologies.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-nature">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-baloo font-bold text-primary mb-6">
            About Our Hive 🏠
          </h1>
          <p className="text-xl md:text-2xl font-comic text-foreground max-w-3xl mx-auto leading-relaxed">
            A family of learners where joy, nature, and early education bloom together
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-16 shadow-nature border-0 bg-card/90 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-baloo font-bold text-primary mb-6">
                  Our Mission 🌟
                </h2>
                <p className="text-lg font-comic text-foreground leading-relaxed mb-6">
                  At Bumblebee Preschool, we believe that every child is like a little bee - 
                  curious, energetic, and ready to explore the world around them. Our mission 
                  is to provide a safe, nurturing, and stimulating environment where children 
                  can grow, learn, and blossom into confident young learners.
                </p>
                <p className="text-lg font-comic text-foreground leading-relaxed">
                  We combine the best of traditional values with modern educational approaches, 
                  ensuring that each child receives the individual attention they deserve while 
                  building strong foundations for lifelong learning.
                </p>
              </div>
              <div className="text-center">
                <div className="text-8xl mb-4 animate-bounce-gentle">🌻</div>
                <p className="font-comic text-muted-foreground italic">
                  "Where every child blooms at their own pace"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-baloo font-bold text-center text-primary mb-12">
            Our Core Values 💝
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-glow transition-all duration-300 hover:scale-105 border-0 bg-card/90 backdrop-blur-sm"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-wiggle">
                      <IconComponent className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-baloo font-bold text-xl text-primary mb-3">
                      {value.title}
                    </h3>
                    <p className="font-comic text-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <Card className="shadow-nature border-0 bg-card/90 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-baloo font-bold text-primary mb-8">
              Our Dedicated Team 👥
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-float">👩‍🏫</div>
                <h3 className="font-baloo font-bold text-xl text-primary mb-2">
                  Qualified Teachers
                </h3>
                <p className="font-comic text-foreground">
                  Our experienced educators are passionate about early childhood development
                </p>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4 animate-float" style={{ animationDelay: '0.5s' }}>🎨</div>
                <h3 className="font-baloo font-bold text-xl text-primary mb-2">
                  Creative Specialists
                </h3>
                <p className="font-comic text-foreground">
                  Art, music, and movement specialists who inspire creativity
                </p>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4 animate-float" style={{ animationDelay: '1s' }}>💚</div>
                <h3 className="font-baloo font-bold text-xl text-primary mb-2">
                  Caring Support Staff
                </h3>
                <p className="font-comic text-foreground">
                  Dedicated support team ensuring safety and comfort for all children
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;