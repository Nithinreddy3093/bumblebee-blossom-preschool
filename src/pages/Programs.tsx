import React from 'react';
import { Clock, Users, Calendar, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Programs = () => {
  const programs = [
    {
      name: 'Playgroup',
      emoji: '🐣',
      ageRange: '1.5 - 2.5 years',
      duration: '2-3 hours',
      classSize: '6-8 children',
      description: 'Our littlest bees begin their journey with sensory play, music, and gentle social interaction.',
      features: [
        'Sensory exploration activities',
        'Music and movement sessions',
        'Basic social skills development',
        'Parent-child bonding time',
        'Safe crawling and climbing spaces'
      ],
      schedule: 'Mon, Wed, Fri - 9:00 AM to 12:00 PM',
      bgColor: 'bg-flower-pink/20',
      borderColor: 'border-flower-pink'
    },
    {
      name: 'Nursery',
      emoji: '🐛',
      ageRange: '2.5 - 3.5 years',
      duration: '4 hours',
      classSize: '8-10 children',
      description: 'Young learners develop independence, creativity, and early learning skills through play-based activities.',
      features: [
        'Art and craft activities',
        'Story time and rhymes',
        'Basic number and letter recognition',
        'Nature exploration walks',
        'Social play and sharing'
      ],
      schedule: 'Mon to Fri - 8:30 AM to 12:30 PM',
      bgColor: 'bg-leaf-green/20',
      borderColor: 'border-leaf-green'
    },
    {
      name: 'Pre-KG',
      emoji: '🐝',
      ageRange: '3.5 - 4.5 years',
      duration: '5 hours',
      classSize: '10-12 children',
      description: 'Our busy bees prepare for formal schooling with structured learning and advanced social skills.',
      features: [
        'Pre-reading and pre-writing skills',
        'Basic math concepts',
        'Science experiments',
        'Group projects and presentations',
        'School readiness activities'
      ],
      schedule: 'Mon to Fri - 8:00 AM to 1:00 PM',
      bgColor: 'bg-primary/20',
      borderColor: 'border-primary'
    }
  ];

  const extraActivities = [
    { name: 'Garden Time', emoji: '🌱', description: 'Hands-on gardening and nature education' },
    { name: 'Cooking Fun', emoji: '👨‍🍳', description: 'Simple cooking activities to learn life skills' },
    { name: 'Music & Dance', emoji: '🎵', description: 'Musical instruments and movement activities' },
    { name: 'Yoga & Mindfulness', emoji: '🧘‍♀️', description: 'Age-appropriate relaxation and breathing exercises' }
  ];

  return (
    <div className="min-h-screen bg-gradient-nature">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-baloo font-bold text-primary mb-6">
            Our Programs 📚
          </h1>
          <p className="text-xl md:text-2xl font-comic text-foreground max-w-3xl mx-auto leading-relaxed">
            Carefully designed programs for every stage of your little bee's development
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => (
            <Card 
              key={index}
              className={`group hover:shadow-glow transition-all duration-500 hover:scale-105 border-2 ${program.borderColor} ${program.bgColor} backdrop-blur-sm`}
            >
              <CardHeader className="text-center">
                <div className="text-6xl mb-4 group-hover:animate-bounce-gentle">
                  {program.emoji}
                </div>
                <CardTitle className="font-baloo font-bold text-2xl text-primary">
                  {program.name}
                </CardTitle>
                <p className="font-comic text-lg text-accent-foreground font-medium">
                  {program.ageRange}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="font-comic text-foreground leading-relaxed">
                  {program.description}
                </p>
                
                {/* Program Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-comic">{program.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="font-comic">{program.classSize}</span>
                  </div>
                  <div className="flex items-center space-x-2 col-span-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-comic text-xs">{program.schedule}</span>
                  </div>
                </div>

                {/* Features List */}
                <div>
                  <h4 className="font-baloo font-bold text-primary mb-3">Program Highlights:</h4>
                  <ul className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="font-comic text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  asChild
                  className="w-full bg-gradient-primary font-comic font-bold hover:scale-105 transition-transform"
                >
                  <Link to="/contact">Enroll Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Extra Activities Section */}
        <Card className="shadow-nature border-0 bg-card/90 backdrop-blur-sm mb-16">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-4xl md:text-5xl font-baloo font-bold text-center text-primary mb-12">
              Special Activities 🎨
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {extraActivities.map((activity, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-xl bg-gradient-flower hover:shadow-soft transition-all duration-300 hover:scale-105"
                >
                  <div className="text-4xl mb-3 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                    {activity.emoji}
                  </div>
                  <h3 className="font-baloo font-bold text-lg text-primary mb-2">
                    {activity.name}
                  </h3>
                  <p className="font-comic text-sm text-foreground">
                    {activity.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="inline-block shadow-glow border-2 border-primary bg-gradient-primary p-8">
            <h3 className="text-3xl font-baloo font-bold text-primary-foreground mb-4">
              Ready to Join Our Buzzing Community? 🐝
            </h3>
            <p className="font-comic text-primary-foreground mb-6">
              Contact us today to schedule a visit and see our programs in action!
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-card text-primary font-comic font-bold hover:scale-105 transition-transform"
            >
              <Link to="/contact">Schedule a Visit</Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Programs;