import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import gallery1 from '@/assets/gallery-1.png';
import gallery2 from '@/assets/gallery-2.png';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Mock gallery data - in a real app, this would come from a CMS or database
  const galleryImages = [
    {
      id: 1,
      src: gallery1,
      title: 'Classroom Activities',
      description: 'Children engaged in creative learning activities'
    },
    {
      id: 2,
      src: gallery2,
      title: 'Garden Field Trip',
      description: 'Exploring nature and learning about plants'
    },
    // Mock additional images with placeholder patterns
    {
      id: 3,
      src: gallery1,
      title: 'Art & Craft Time',
      description: 'Creative expression through colors and shapes'
    },
    {
      id: 4,
      src: gallery2,
      title: 'Music & Movement',
      description: 'Dancing and singing with friends'
    },
    {
      id: 5,
      src: gallery1,
      title: 'Story Time',
      description: 'Gathering around for magical stories'
    },
    {
      id: 6,
      src: gallery2,
      title: 'Playground Fun',
      description: 'Active play and social interaction'
    },
    {
      id: 7,
      src: gallery1,
      title: 'Science Exploration',
      description: 'Discovering the world through simple experiments'
    },
    {
      id: 8,
      src: gallery2,
      title: 'Cooking Activities',
      description: 'Learning life skills through cooking'
    },
    {
      id: 9,
      src: gallery1,
      title: 'Graduation Day',
      description: 'Celebrating our little graduates'
    }
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-nature">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-baloo font-bold text-primary mb-6">
            Our Gallery 📸
          </h1>
          <p className="text-xl md:text-2xl font-comic text-foreground max-w-3xl mx-auto leading-relaxed">
            Take a peek into our vibrant learning environment and see the joy on our little bees' faces!
          </p>
        </div>

        {/* Gallery Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['All', 'Classroom', 'Outdoor', 'Events', 'Activities'].map((category) => (
            <Button
              key={category}
              variant={category === 'All' ? 'default' : 'outline'}
              className="font-comic hover:scale-105 transition-transform"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {galleryImages.map((image, index) => (
            <Card 
              key={image.id}
              className="group cursor-pointer hover:shadow-glow transition-all duration-300 hover:scale-105 border-0 bg-card/90 backdrop-blur-sm overflow-hidden"
              onClick={() => openLightbox(index)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-baloo font-bold text-lg mb-1">{image.title}</h3>
                      <p className="font-comic text-sm">{image.description}</p>
                    </div>
                  </div>
                  {/* Hover overlay with emoji */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-4xl animate-bounce-gentle">📷</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fun Stats Section */}
        <Card className="shadow-nature border-0 bg-card/90 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-4xl md:text-5xl font-baloo font-bold text-center text-primary mb-12">
              Our Buzzing Community 📊
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl animate-bounce-gentle">👨‍👩‍👧‍👦</div>
                <div className="text-3xl font-baloo font-bold text-primary">50+</div>
                <p className="font-comic text-foreground">Happy Families</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>🎨</div>
                <div className="text-3xl font-baloo font-bold text-primary">100+</div>
                <p className="font-comic text-foreground">Art Projects</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl animate-bounce-gentle" style={{ animationDelay: '0.4s' }}>🌱</div>
                <div className="text-3xl font-baloo font-bold text-primary">25+</div>
                <p className="font-comic text-foreground">Garden Plants</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl animate-bounce-gentle" style={{ animationDelay: '0.6s' }}>📚</div>
                <div className="text-3xl font-baloo font-bold text-primary">200+</div>
                <p className="font-comic text-foreground">Story Books</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 bg-white/20 hover:bg-white/30 text-white border-0"
              size="sm"
            >
              <X className="w-6 h-6" />
            </Button>
            
            <img
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            
            {/* Navigation arrows */}
            <Button
              onClick={() => navigateLightbox('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0"
              size="sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <Button
              onClick={() => navigateLightbox('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0"
              size="sm"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
            
            {/* Image info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 className="font-baloo font-bold text-xl text-white mb-2">
                {galleryImages[selectedImage].title}
              </h3>
              <p className="font-comic text-white/90">
                {galleryImages[selectedImage].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;