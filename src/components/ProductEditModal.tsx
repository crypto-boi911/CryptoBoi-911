
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Product {
  id: number;
  name: string;
  category: string;
  type: string;
  balance: string;
  price: number;
  status: 'active' | 'inactive';
  stock: number;
}

interface ProductEditModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const ProductEditModal = ({ product, isOpen, onClose, onSave }: ProductEditModalProps) => {
  const [editedProduct, setEditedProduct] = useState<Product | null>(product);

  React.useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleSave = () => {
    if (editedProduct) {
      onSave(editedProduct);
      onClose();
    }
  };

  if (!editedProduct) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cyber-gray border-cyber-blue/20 text-cyber-light max-w-md">
        <DialogHeader>
          <DialogTitle className="text-cyber-blue">Edit Product</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-cyber-light">Product Name</Label>
            <Input
              id="name"
              value={editedProduct.name}
              onChange={(e) => setEditedProduct({...editedProduct, name: e.target.value})}
              className="bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-cyber-light">Category</Label>
            <Select
              value={editedProduct.category}
              onValueChange={(value) => setEditedProduct({...editedProduct, category: value})}
            >
              <SelectTrigger className="bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-cyber-gray border-cyber-blue/20">
                <SelectItem value="Bank Logs">Bank Logs</SelectItem>
                <SelectItem value="PayPal Logs">PayPal Logs</SelectItem>
                <SelectItem value="Cards">Cards</SelectItem>
                <SelectItem value="CashApp Logs">CashApp Logs</SelectItem>
                <SelectItem value="Tools">Tools</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="type" className="text-cyber-light">Type</Label>
            <Input
              id="type"
              value={editedProduct.type}
              onChange={(e) => setEditedProduct({...editedProduct, type: e.target.value})}
              className="bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
            />
          </div>

          <div>
            <Label htmlFor="balance" className="text-cyber-light">Balance</Label>
            <Input
              id="balance"
              value={editedProduct.balance}
              onChange={(e) => setEditedProduct({...editedProduct, balance: e.target.value})}
              className="bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
            />
          </div>

          <div>
            <Label htmlFor="price" className="text-cyber-light">Price</Label>
            <Input
              id="price"
              type="number"
              value={editedProduct.price}
              onChange={(e) => setEditedProduct({...editedProduct, price: Number(e.target.value)})}
              className="bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
            />
          </div>

          <div>
            <Label htmlFor="stock" className="text-cyber-light">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={editedProduct.stock}
              onChange={(e) => setEditedProduct({...editedProduct, stock: Number(e.target.value)})}
              className="bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
            />
          </div>

          <div>
            <Label htmlFor="status" className="text-cyber-light">Status</Label>
            <Select
              value={editedProduct.status}
              onValueChange={(value: 'active' | 'inactive') => setEditedProduct({...editedProduct, status: value})}
            >
              <SelectTrigger className="bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-cyber-gray border-cyber-blue/20">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-cyber-blue/30 text-cyber-light hover:bg-cyber-blue/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-cyber-blue text-cyber-dark hover:bg-cyber-blue/80"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductEditModal;
