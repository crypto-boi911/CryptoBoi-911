
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-cyber-gradient flex items-center justify-center">
      <div className="max-w-md w-full px-4">
        <Card className="bg-cyber-darker/60 border-cyber-blue/30 text-center">
          <CardContent className="p-8">
            <AlertTriangle className="h-16 w-16 text-cyber-blue mx-auto mb-4" />
            <h1 className="text-4xl font-cyber font-bold text-cyber-blue mb-4">404</h1>
            <h2 className="text-xl font-tech text-cyber-light mb-4">Page Not Found</h2>
            <p className="text-cyber-light/70 mb-6">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/">
              <Button className="bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
