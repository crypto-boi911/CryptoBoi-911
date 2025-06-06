
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-cyber-gradient pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Card className="bg-cyber-darker/60 border-cyber-blue/30 py-12">
              <CardContent>
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-12 w-12 text-red-400" />
                  </div>
                </div>
                
                <h1 className="text-6xl font-cyber font-bold text-cyber-blue mb-4">
                  404
                </h1>
                
                <h2 className="text-2xl font-cyber text-cyber-light mb-4">
                  Page Not Found
                </h2>
                
                <p className="text-cyber-light/70 text-lg mb-8 max-w-md mx-auto">
                  The page you're looking for doesn't exist or has been moved.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate(-1)}
                    variant="outline"
                    className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark font-tech"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Go Back
                  </Button>
                  
                  <Button
                    onClick={() => navigate('/')}
                    className="bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Go Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
