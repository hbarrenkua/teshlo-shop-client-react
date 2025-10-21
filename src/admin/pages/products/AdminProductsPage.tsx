import { AdminTitle } from '@/admin/components/AdminTitle';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { currencyFormatter } from '@/lib/currency-formatter';
import { useProducts } from '@/shop/hooks/useProducts';
import { PencilIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router';

export const AdminProductsPage = () => {


  const { data, isLoading } = useProducts();
  if (isLoading) {
    return <CustomFullScreenLoading />

  }


  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle
          title="Productos"
          subtitle="Aquí puedes ver y administrar tus productos"
        />

        <div className="flex justify-end mb-10 gap-4">
          <Link to="/admin/products/new">
            <Button>
              <PlusIcon />
              Nuevo producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {
            data?.products.map(p => (


              <TableRow key={p.id}>
                <TableCell className="font-medium">1</TableCell>
                <TableCell>
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell>
                  <Link to={`/admin/products/${p.id}`}
                    className='hover:text-blue-500 underline'>
                    {p.title}
                  </Link>
                </TableCell>
                <TableCell>{currencyFormatter(p.price)}</TableCell>
                <TableCell>{p.gender}</TableCell>
                <TableCell>{p.stock} stock</TableCell>
                <TableCell>{p.sizes.join(', ')}</TableCell>
                <TableCell className="text-right">
                  {/* <Link to={`t-shirt-teslo`}>Editar</Link> */}
                  <Link to={`/admin/products/${p.id}`}>
                    <PencilIcon className='w-4 h-4 text-blue-500' />
                  </Link>
                </TableCell>
              </TableRow>



            ))
          }
        </TableBody>
      </Table>

      <CustomPagination totalPages={data?.pages || 1} />
    </>
  );
};
