'use client';

export function ScalarAPI() {
  return (
    <div className="w-full min-h-screen border rounded-lg overflow-hidden bg-gray-50 flex flex-col">
      <div className="p-6 bg-white border-b">
        <h3 className="text-xl font-semibold mb-2">Interactive API Documentation</h3>
        <p className="text-gray-600">
          The interactive API documentation will be available here. In the meantime, you can access the OpenAPI specification directly.
        </p>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          <h4 className="text-lg font-medium">API Specification Available</h4>
          <p className="text-gray-600 max-w-md">
            You can explore the full OpenAPI specification and test endpoints using tools like Postman, Insomnia, or any OpenAPI-compatible client.
          </p>
          
          <div className="space-y-3 pt-4">
            <a 
              href="/api/openapi.yaml" 
              target="_blank"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download OpenAPI Spec
            </a>
            
            <div className="text-sm text-gray-500">
              Or view it in your favorite API client
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-gray-50 border-t">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h5 className="font-medium mb-1">Base URL</h5>
            <code className="text-blue-600">https://api.msa.omnes.tech</code>
          </div>
          <div>
            <h5 className="font-medium mb-1">Authentication</h5>
            <span className="text-gray-600">Fireblocks HSM/MPC</span>
          </div>
          <div>
            <h5 className="font-medium mb-1">Content Type</h5>
            <code className="text-gray-600">application/json</code>
          </div>
        </div>
      </div>
    </div>
  );
} 