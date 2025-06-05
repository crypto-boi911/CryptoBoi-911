import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Edit, Trash2, Eye, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ContentResponseModal from '@/components/ContentResponseModal';

interface ContentItem {
  id: number;
  title: string;
  type: 'announcement' | 'page' | 'banner';
  status: 'published' | 'draft';
  lastModified: string;
  author: string;
}

const AdminContent = () => {
  const { toast } = useToast();
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  
  const [content, setContent] = useState<ContentItem[]>([
    { id: 1, title: 'Welcome Banner', type: 'banner', status: 'published', lastModified: '2024-06-04 10:30', author: 'Admin' },
    { id: 2, title: 'New Security Updates', type: 'announcement', status: 'published', lastModified: '2024-06-03 15:45', author: 'Admin' },
    { id: 3, title: 'Terms of Service', type: 'page', status: 'published', lastModified: '2024-06-01 09:20', author: 'Admin' },
    { id: 4, title: 'Maintenance Notice', type: 'announcement', status: 'draft', lastModified: '2024-06-04 08:15', author: 'Admin' },
  ]);

  const deleteContent = (id: number) => {
    if (confirm('Are you sure you want to delete this content?')) {
      setContent(content.filter(c => c.id !== id));
      toast({
        title: "Content Deleted",
        description: "Content has been removed successfully",
      });
    }
  };

  const toggleStatus = (id: number) => {
    setContent(content.map(c => 
      c.id === id ? { ...c, status: c.status === 'published' ? 'draft' : 'published' } : c
    ));
    toast({
      title: "Status Updated",
      description: "Content status has been changed",
    });
  };

  const handleRespond = (contentItem: ContentItem) => {
    setSelectedContent(contentItem);
    setIsResponseModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-cyber-gradient pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link to="/admin/dashboard" className="text-cyber-blue hover:text-cyber-blue/80 mb-4 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-4xl md:text-5xl font-cyber font-bold text-cyber-blue mb-4">
                Content Management
              </h1>
              <p className="text-xl text-cyber-light/70">
                Manage announcements, pages, and site content
              </p>
            </div>
            <Button className="bg-cyber-blue text-cyber-dark hover:bg-cyber-blue/80">
              <Plus className="h-4 w-4 mr-2" />
              Create Content
            </Button>
          </div>

          {/* Content Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Published</p>
                    <p className="text-2xl font-bold text-green-400">
                      {content.filter(c => c.status === 'published').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Eye className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Drafts</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      {content.filter(c => c.status === 'draft').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Edit className="h-6 w-6 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Total Content</p>
                    <p className="text-2xl font-bold text-cyber-blue">{content.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-cyber-blue/20 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-cyber-blue" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Table */}
          <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-cyber-blue" />
                <div>
                  <CardTitle className="text-cyber-light font-tech">
                    Content Items
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-cyber-blue/20">
                      <TableHead className="text-cyber-light">Title</TableHead>
                      <TableHead className="text-cyber-light">Type</TableHead>
                      <TableHead className="text-cyber-light">Status</TableHead>
                      <TableHead className="text-cyber-light">Last Modified</TableHead>
                      <TableHead className="text-cyber-light">Author</TableHead>
                      <TableHead className="text-cyber-light">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {content.map((item) => (
                      <TableRow key={item.id} className="border-cyber-blue/10">
                        <TableCell className="text-cyber-light font-medium">{item.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-cyber-blue/30 text-cyber-blue">
                            {item.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={item.status === 'published' ? 'default' : 'secondary'}
                            className={item.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-cyber-light/70">{item.lastModified}</TableCell>
                        <TableCell className="text-cyber-light/70">{item.author}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleStatus(item.id)}
                              className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-green-400/30 text-green-400 hover:bg-green-400 hover:text-white"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRespond(item)}
                              className="border-purple-400/30 text-purple-400 hover:bg-purple-400 hover:text-white"
                            >
                              <MessageCircle className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteContent(item.id)}
                              className="border-red-400/30 text-red-400 hover:bg-red-400 hover:text-white"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <ContentResponseModal
        isOpen={isResponseModalOpen}
        onClose={() => setIsResponseModalOpen(false)}
        contentItem={selectedContent}
      />
    </div>
  );
};

export default AdminContent;
