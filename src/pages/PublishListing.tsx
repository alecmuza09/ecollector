import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Info, Eye, Save, Send, AlertCircle, CheckCircle } from 'lucide-react';

// Interfaz para los datos del formulario
interface ListingFormData {
  title: string;
  category: string;
  price: string; // Usar string para manejar input, convertir a número al enviar
  description: string;
  condition: 'Nuevo' | 'Usado' | 'Reacondicionado' | '';
  brand: string;
  images: File[];
  stock: string;
  shippingInfo: string;
  specifications: string;
}

// Interfaz para los errores de validación
interface FormErrors {
  title?: string;
  category?: string;
  price?: string;
  description?: string;
  images?: string;
  general?: string; // Para errores generales
}

// Opciones de categoría (podrían venir de una API o constante)
const CATEGORIES = ['PET', 'Cartón', 'Vidrio', 'Metal', 'Electrónicos', 'Otros'];

const PublishListing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ListingFormData>({
    title: '',
    category: '',
    price: '',
    description: '',
    condition: '',
    brand: '',
    images: [],
    stock: '1',
    shippingInfo: '',
    specifications: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState(1); // Para indicador de progreso simple

  // --- Handlers --- //

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error específico al empezar a corregir
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const currentImageCount = formData.images.length;
      const maxImages = 5;
      const availableSlots = maxImages - currentImageCount;

      if (files.length > availableSlots) {
        setErrors(prev => ({ ...prev, images: `Puedes subir ${availableSlots} imágenes más (máximo 5).` }));
        // Solo tomar los archivos permitidos
        files.splice(availableSlots);
      } else {
         setErrors(prev => ({ ...prev, images: undefined })); // Limpiar error si es válido
      }
      
      if(files.length === 0) return;

      setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));

      // Crear previsualizaciones
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
     // Reset input para permitir subir el mismo archivo si se elimina y se vuelve a añadir
     e.target.value = '';
  };

  const removeImage = (index: number) => {
    // Revocar URL de objeto para liberar memoria
    URL.revokeObjectURL(imagePreviews[index]);
    
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
     setErrors(prev => ({ ...prev, images: undefined })); // Limpiar error al eliminar
  };

  // --- Validación --- //
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.title.trim()) newErrors.title = 'El título es obligatorio.';
    if (!formData.category) newErrors.category = 'Selecciona una categoría.';
    if (!formData.price.trim() || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Introduce un precio válido mayor que 0.';
    }
    if (formData.description.trim().length < 50) {
      newErrors.description = 'La descripción debe tener al menos 50 caracteres.';
    }
    if (formData.images.length === 0) {
      newErrors.images = 'Debes subir al menos una imagen.';
    } else if (formData.images.length > 5) {
       newErrors.images = 'Puedes subir un máximo de 5 imágenes.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Acciones --- //

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionStatus('idle');
    console.log('Enviando datos:', formData);

    // Simular llamada a API
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simular delay
      console.log('Publicación exitosa');
      setSubmissionStatus('success');
      // Opcional: Redirigir o limpiar formulario
      // navigate('/perfil/mis-publicaciones'); 
      // setFormData({...initialState}); setImagePreviews([]); 
    } catch (error) {
      console.error('Error al publicar:', error);
      setSubmissionStatus('error');
      setErrors(prev => ({ ...prev, general: 'Error al publicar el anuncio. Inténtalo de nuevo.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    // TODO: Implementar lógica para guardar borrador (API call)
    console.log('Guardando borrador:', formData);
    alert('Funcionalidad de guardar borrador no implementada aún.');
  };

  // --- Renderizado --- //

  // Componente para la vista previa
  const ListingPreview = () => (
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-4">Vista Previa del Anuncio</h2>
          <h3 className="text-xl font-bold mb-2">{formData.title || "(Sin título)"}</h3>
          <p><span className="font-semibold">Categoría:</span> {formData.category || "(Sin categoría)"}</p>
          <p><span className="font-semibold">Precio:</span> {formData.price ? `${formData.price} €` : "(Sin precio)"}</p>
          <p><span className="font-semibold">Condición:</span> {formData.condition || "(No especificada)"}</p>
          <p><span className="font-semibold">Marca:</span> {formData.brand || "(No especificada)"}</p>
          <p><span className="font-semibold">Stock:</span> {formData.stock || "1"}</p>
          <div className="mt-4">
              <h4 className="font-semibold">Descripción:</h4>
              <p className="text-gray-700 whitespace-pre-wrap">{formData.description || "(Sin descripción)"}</p>
          </div>
          <div className="mt-4">
              <h4 className="font-semibold">Especificaciones:</h4>
              <p className="text-gray-700 whitespace-pre-wrap">{formData.specifications || "(Sin especificaciones)"}</p>
          </div>
          <div className="mt-4">
              <h4 className="font-semibold">Información de Envío:</h4>
              <p className="text-gray-700 whitespace-pre-wrap">{formData.shippingInfo || "(No especificada)"}</p>
          </div>
           <div className="mt-4">
              <h4 className="font-semibold">Imágenes ({imagePreviews.length}):</h4>
               {imagePreviews.length > 0 ? (
                  <div className="flex flex-wrap gap-4 mt-2">
                      {imagePreviews.map((previewUrl, index) => (
                          <img key={index} src={previewUrl} alt={`Vista previa ${index + 1}`} className="h-24 w-24 object-cover rounded-md border"/>
                      ))}
                  </div>
              ) : <p className="text-gray-500 italic">No hay imágenes.</p>}
          </div>
          <div className="mt-6 flex justify-end gap-3">
              <button 
                  type="button"
                  onClick={() => setIsPreview(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                  Editar Anuncio
              </button>
              <button
                  type="button" // Importante que no sea submit
                  onClick={handleSubmit} // Usar el mismo handler de submit
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2"
              >
                   {isSubmitting ? 'Publicando...' : <><Send size={18}/> Publicar Anuncio</>}
              </button>
          </div>
      </div>
  );

  if (submissionStatus === 'success') {
     return (
       <div className="container mx-auto px-4 py-12 text-center">
            <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4"/>
            <h1 className="text-2xl font-bold text-gray-800 mb-3">¡Anuncio Publicado!</h1>
            <p className="text-gray-600 mb-6">Tu anuncio ha sido publicado correctamente.</p>
            <div className="flex justify-center gap-4">
                 <button onClick={() => { /* Reset form state */ setFormData({title:'', category:'', price:'', description:'', condition:'', brand:'', images:[], stock:'1', shippingInfo:'', specifications:''}); setImagePreviews([]); setSubmissionStatus('idle'); setErrors({}); setIsPreview(false); setCurrentStep(1); } } className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Publicar otro anuncio</button>
                 <button onClick={() => navigate('/perfil')} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">Ir a mi Perfil</button>
            </div>
        </div>
    );
  }

  // Si está en modo preview, mostrar el preview
  if (isPreview) {
      return (
        <div className="container mx-auto px-4 py-12">
           <ListingPreview />
        </div>
      )
  }

  // Renderizado del formulario principal
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Publicar Nuevo Anuncio</h1>
      {/* Indicador de Progreso Simple */}
      <div className="mb-6 text-sm text-gray-500">Paso {currentStep} de 3: Detalles del producto</div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-emerald-700 mb-4 border-b pb-2">Información Esencial</h2>
          
          {/* Título */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título del Anuncio <span className="text-red-500">*</span></label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required 
                   className={`w-full p-2 border rounded-lg shadow-sm ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:ring-emerald-500 focus:border-emerald-500`} />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Categoría */}
              <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Categoría <span className="text-red-500">*</span></label>
                  <select id="category" name="category" value={formData.category} onChange={handleChange} required
                          className={`w-full p-2 border rounded-lg shadow-sm ${errors.category ? 'border-red-500' : 'border-gray-300'} focus:ring-emerald-500 focus:border-emerald-500 bg-white`}>
                      <option value="" disabled>Selecciona una categoría...</option>
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
              </div>
              {/* Precio */}
              <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Precio (€) <span className="text-red-500">*</span></label>
                  <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required min="0.01" step="0.01"
                        className={`w-full p-2 border rounded-lg shadow-sm ${errors.price ? 'border-red-500' : 'border-gray-300'} focus:ring-emerald-500 focus:border-emerald-500`} />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
              </div>
          </div>
          
           {/* Descripción */}
           <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción <span className="text-red-500">*</span> (mín. 50 caracteres)</label>
                <textarea id="description" name="description" rows={5} value={formData.description} onChange={handleChange} required minLength={50}
                          className={`w-full p-2 border rounded-lg shadow-sm ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:ring-emerald-500 focus:border-emerald-500`}></textarea>
                 {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                 <p className="text-xs text-gray-500 mt-1">Caracteres: {formData.description.length}</p>
            </div>
        </div>

        {/* TODO: Separar en pasos o secciones colapsables? Por ahora todo junto */} 

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-emerald-700 mb-4 border-b pb-2">Detalles Adicionales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                 {/* Condición */}
                <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">Condición</label>
                    <select id="condition" name="condition" value={formData.condition} onChange={handleChange}
                            className={`w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 bg-white`}>
                        <option value="">No especificada</option>
                        <option value="Nuevo">Nuevo</option>
                        <option value="Usado">Usado</option>
                        <option value="Reacondicionado">Reacondicionado</option>
                    </select>
                 </div>
                {/* Marca */}
                <div>
                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">Marca/Fabricante</label>
                    <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange}
                           className={`w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500`} />
                </div>
                 {/* Stock */}
                 <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Cantidad Disponible</label>
                    <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} min="1" step="1"
                            className={`w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500`} />
                 </div>
            </div>
            {/* Especificaciones */}
            <div className="mb-4">
                <label htmlFor="specifications" className="block text-sm font-medium text-gray-700 mb-1">Especificaciones Técnicas</label>
                 <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <Info size={14}/> <span>(Ej: Dimensiones, peso, material exacto, certificaciones)</span>
                 </div>
                <textarea id="specifications" name="specifications" rows={4} value={formData.specifications} onChange={handleChange}
                          className={`w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500`}></textarea>
            </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
             <h2 className="text-xl font-semibold text-emerald-700 mb-4 border-b pb-2">Imágenes <span className="text-red-500">*</span></h2>
             <div className="mb-4">
                <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">Sube entre 1 y 5 fotos</label>
                <div className="flex items-center gap-4">
                    <input 
                        type="file"
                        id="images" 
                        name="images" 
                        multiple 
                        accept="image/png, image/jpeg, image/webp" 
                        onChange={handleImageChange} 
                        disabled={formData.images.length >= 5} // Deshabilitar si ya hay 5
                        className="hidden" // Ocultar input real
                    />
                    <label 
                        htmlFor="images" 
                        className={`cursor-pointer px-4 py-2 border rounded-lg flex items-center gap-2 transition ${formData.images.length >= 5 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-emerald-600 border-emerald-600 hover:bg-emerald-50'}`}
                     >
                         <Upload size={18}/> <span>Añadir Imágenes ({formData.images.length}/5)</span>
                    </label>
                 </div>
                {errors.images && <p className="text-red-500 text-xs mt-2">{errors.images}</p>}
             </div>
             {/* Previsualización de Imágenes */}
             {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {imagePreviews.map((previewUrl, index) => (
                        <div key={index} className="relative group">
                            <img src={previewUrl} alt={`Vista previa ${index + 1}`} className="h-24 w-full object-cover rounded-md border border-gray-200"/>
                            <button 
                                type="button" 
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                                aria-label="Eliminar imagen"
                            >
                                <X size={14} />
                            </button>
                         </div>
                    ))}
                </div>
            )}
        </div>
        
         <div className="bg-white p-6 rounded-lg shadow-md mb-6">
             <h2 className="text-xl font-semibold text-emerald-700 mb-4 border-b pb-2">Envío</h2>
             <div className="mb-4">
                <label htmlFor="shippingInfo" className="block text-sm font-medium text-gray-700 mb-1">Opciones y Costos de Envío</label>
                 <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <Info size={14}/> <span>(Ej: Envío local gratuito, Costo fijo nacional: 5€, Recogida en persona)</span>
                 </div>
                <textarea id="shippingInfo" name="shippingInfo" rows={3} value={formData.shippingInfo} onChange={handleChange}
                          className={`w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500`}></textarea>
             </div>
        </div>
        
        {/* Errores Generales */} 
        {errors.general && (
             <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
                 <AlertCircle size={18}/>
                 <span>{errors.general}</span>
            </div>
        )}
         {submissionStatus === 'error' && !errors.general && (
             <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
                 <AlertCircle size={18}/>
                 <span>Hubo un error al intentar publicar. Por favor, revisa los datos o inténtalo más tarde.</span>
            </div>
         )}

        {/* Botones de Acción */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
           <button 
               type="button"
               onClick={handleSaveDraft} 
               className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-2"
           >
               <Save size={18}/> Guardar Borrador
           </button>
           <div className="w-full sm:w-auto flex gap-3">
               <button 
                   type="button"
                   onClick={() => { if (validateForm()) setIsPreview(true); } } 
                   className="w-full sm:w-auto px-4 py-2 border border-emerald-600 rounded-lg text-emerald-600 hover:bg-emerald-50 flex items-center justify-center gap-2"
               >
                   <Eye size={18}/> Vista Previa
               </button>
                <button 
                   type="submit" 
                   disabled={isSubmitting}
                   className="w-full sm:w-auto px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center gap-2"
               >
                    {isSubmitting ? 'Publicando...' : <><Send size={18}/> Publicar Anuncio</>}
               </button>
           </div>
        </div>
      </form>
    </div>
  );
};

export default PublishListing; 