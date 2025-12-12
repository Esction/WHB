import React from 'react';
import { HistoryRecord } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: HistoryRecord[];
  onLoad: (record: HistoryRecord) => void;
  onDelete: (id: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ 
  isOpen, 
  onClose, 
  records, 
  onLoad, 
  onDelete 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal Panel */}
        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  运费计算记录
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-4">
                    点击记录可直接恢复货物清单和目的地进行查询。
                  </p>
                  
                  {records.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                      暂无历史记录<br/>
                      <span className="text-xs">计算结果后点击“保存记录”或自动保存</span>
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
                      {records.map((record) => (
                        <li key={record.id} className="py-3 group">
                          <div className="flex justify-between items-start">
                            <button 
                              onClick={() => onLoad(record)}
                              className="text-left flex-1 hover:bg-gray-50 -m-2 p-2 rounded-md transition-colors"
                            >
                              <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                                    {record.regionName}
                                  </span>
                                  {record.note === '自动保存' && (
                                     <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200">
                                       自动保存
                                     </span>
                                  )}
                                </div>
                                <span className="text-xs text-gray-400">
                                  {new Date(record.timestamp).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit' })}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 line-clamp-2">
                                {record.items.map(i => `${i.sku}×${i.quantity}`).join(', ')}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                共 {record.items.reduce((sum, i) => sum + Number(i.quantity), 0)} 件货物
                              </p>
                            </button>
                            <button 
                              onClick={() => onDelete(record.id)}
                              className="ml-3 text-gray-300 hover:text-red-500 p-1"
                              title="删除"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};