
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface ContentItem {
  id: number;
  title: string;
  type: 'announcement' | 'page' | 'banner';
  status: 'published' | 'draft';
  lastModified: string;
  author: string;
}

interface ContentResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentItem: ContentItem | null;
}

const ContentResponseModal: React.FC<ContentResponseModalProps> = ({ isOpen, onClose, contentItem }) => {
  const [response, setResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!response.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Response Sent",
        description: `Response to "${contentItem?.title}" has been sent successfully`,
      });
      setResponse('');
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    setResponse('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[525px] bg-cyber-gray border-cyber-blue/30">
        <DialogHeader>
          <DialogTitle className="text-cyber-light font-tech">
            Respond to Content
          </DialogTitle>
          <DialogDescription className="text-cyber-light/60">
            {contentItem && `Responding to: ${contentItem.title} (${contentItem.type})`}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="response" className="text-cyber-light">
              Response Message
            </Label>
            <Textarea
              id="response"
              placeholder="Enter your response..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="min-h-[120px] bg-cyber-dark/50 border-cyber-blue/30 text-cyber-light placeholder:text-cyber-light/40 focus:border-cyber-blue"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!response.trim() || isSubmitting}
              className="bg-cyber-blue text-cyber-dark hover:bg-cyber-blue/80"
            >
              {isSubmitting ? 'Sending...' : 'Send Response'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContentResponseModal;
