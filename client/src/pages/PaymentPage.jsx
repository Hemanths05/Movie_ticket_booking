import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Wallet, CheckCircle } from 'lucide-react';

const PaymentPage = () => {
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state || {};
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    if (!cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }
    
    if (!cardExpiry.trim()) {
      newErrors.cardExpiry = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
      newErrors.cardExpiry = 'Please use MM/YY format';
    }
    
    if (!cardCvv.trim()) {
      newErrors.cardCvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(cardCvv)) {
      newErrors.cardCvv = 'CVV must be 3 or 4 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    if (paymentMethod === 'card' && !validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate(`/confirmation/${bookingId}`, { state: { ...bookingData } });
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    }
    
    return value;
  };

  // If no data, redirect to home
  if (!bookingData.movie) {
    navigate('/');
    return null;
  }

  const { movie, showtime, theater, selectedSeats, totalAmount } = bookingData;

  return (
    <div className="bg-gray-900 min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-400 hover:text-white mb-6"
          disabled={isProcessing}
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to seat selection
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Payment</h1>
            
            {/* Payment Methods */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">Payment Method</h2>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-center px-4 py-3 rounded-lg border-2 ${paymentMethod === 'card' ? 'border-red-500 bg-gray-700' : 'border-gray-600 hover:border-gray-500'} transition-colors`}
                >
                  <CreditCard size={20} className={`mr-2 ${paymentMethod === 'card' ? 'text-red-500' : 'text-gray-400'}`} />
                  <span className="text-white font-medium">Credit/Debit Card</span>
                </button>
                
                <button
                  onClick={() => setPaymentMethod('wallet')}
                  className={`flex items-center justify-center px-4 py-3 rounded-lg border-2 ${paymentMethod === 'wallet' ? 'border-red-500 bg-gray-700' : 'border-gray-600 hover:border-gray-500'} transition-colors`}
                >
                  <Wallet size={20} className={`mr-2 ${paymentMethod === 'wallet' ? 'text-red-500' : 'text-gray-400'}`} />
                  <span className="text-white font-medium">Digital Wallet</span>
                </button>
              </div>
              
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-gray-300 text-sm mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className={`w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${errors.cardNumber ? 'border-red-500 focus:ring-red-500' : 'focus:ring-red-500'}`}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="cardName" className="block text-gray-300 text-sm mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Smith"
                      className={`w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${errors.cardName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-red-500'}`}
                    />
                    {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardExpiry" className="block text-gray-300 text-sm mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="cardExpiry"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
                        className={`w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${errors.cardExpiry ? 'border-red-500 focus:ring-red-500' : 'focus:ring-red-500'}`}
                      />
                      {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="cardCvv" className="block text-gray-300 text-sm mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cardCvv"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        maxLength={4}
                        className={`w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${errors.cardCvv ? 'border-red-500 focus:ring-red-500' : 'focus:ring-red-500'}`}
                      />
                      {errors.cardCvv && <p className="text-red-500 text-xs mt-1">{errors.cardCvv}</p>}
                    </div>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'wallet' && (
                <div className="space-y-4">
                  <p className="text-gray-300">Choose your wallet provider:</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                      <span className="text-white font-medium">Google Pay</span>
                    </button>
                    
                    <button className="flex items-center justify-center px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                      <span className="text-white font-medium">Apple Pay</span>
                    </button>
                    
                    <button className="flex items-center justify-center px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                      <span className="text-white font-medium">PayPal</span>
                    </button>
                    
                    <button className="flex items-center justify-center px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                      <span className="text-white font-medium">Amazon Pay</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Terms & Privacy */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-start mb-4">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 border rounded-sm bg-gray-700 border-gray-600"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-300">
                    I agree to the <a href="#" className="text-red-500 hover:text-red-400">Terms and Conditions</a> and <a href="#" className="text-red-500 hover:text-red-400">Privacy Policy</a>
                  </label>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    type="checkbox"
                    className="w-4 h-4 border rounded-sm bg-gray-700 border-gray-600"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="newsletter" className="text-gray-300">
                    Send me updates about new releases and offers
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Booking Summary */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-white mb-4">Booking Summary</h2>
            <div className="text-sm text-gray-400">
              <p><strong>Movie:</strong> {movie?.title}</p>
              <p><strong>Showtime:</strong> {showtime.date} at {showtime.time}</p>
              <p><strong>Theater:</strong> {theater.name}</p>
              <p><strong>Seats:</strong> {selectedSeats.join(', ')}</p>
              <p><strong>Total:</strong> ₹{totalAmount}</p>
            </div>
            
            <button 
              onClick={handlePayment} 
              className={`mt-6 w-full py-3 text-lg font-semibold text-white bg-red-500 rounded-lg ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
