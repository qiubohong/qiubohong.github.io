#!/usr/bin/env python3
"""
generate_image.py 核心功能测试脚本

只保留调用生成图片的主功能测试，简化测试用例。
"""

import unittest
import os
import sys
import tempfile
import base64
from unittest.mock import patch, MagicMock
from pathlib import Path

# 添加脚本目录到Python路径
sys.path.insert(0, str(Path(__file__).parent))

# 导入被测试的模块
from generate_image import (
    get_env_config,
    generate_prompt_with_nano_banana,
    call_image_generation_api,
    save_image
)


class TestCoreFunctionality(unittest.TestCase):
    """测试核心功能"""
    
    def setUp(self):
        """设置测试环境"""
        self.temp_dir = tempfile.mkdtemp()
        
       
        
        # 测试配置
        self.config = {
            'base_url': 'https://api.test.com/v1',
            'model': 'test-model',
            'api_key': 'test-key'
        }
        self.prompt = "生成一张关于AI技术的图片"
    
    def tearDown(self):
        """清理测试环境"""
        import shutil
        shutil.rmtree(self.temp_dir)
        
        # 清理环境变量
        for key in ['LLM_BASE_URL', 'LLM_MODEL']:
            if key in os.environ:
                del os.environ[key]
    
    def test_get_env_config(self):
        """测试环境配置获取"""
        config = get_env_config()
        
        self.assertEqual(config['base_url'], 'https://api.test.com/v1')
        self.assertEqual(config['model'], 'test-model')
        self.assertEqual(config['api_key'], '')
    
    def test_generate_prompt(self):
        """测试提示词生成"""
        optimized_prompt = generate_prompt_with_nano_banana(self.prompt)
        
        self.assertIn(self.prompt, optimized_prompt)
        self.assertIn("高质量的图片", optimized_prompt)
        self.assertIn("现代、专业、清晰", optimized_prompt)
    
    @patch('generate_image.requests.post')
    def test_api_call_success(self, mock_post):
        """测试API调用成功"""
        # 模拟成功的API响应
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            'data': [{'url': 'https://example.com/image.png'}]
        }
        mock_post.return_value = mock_response
        
        result = call_image_generation_api(self.config, self.prompt)
        
        # 验证API调用
        mock_post.assert_called_once()
        self.assertIsNotNone(result)
        self.assertIn('data', result)
        self.assertEqual(len(result['data']), 1)
    
    @patch('generate_image.requests.get')
    def test_save_image_from_url(self, mock_get):
        """测试从URL保存图片"""
        # 模拟图片下载响应
        mock_response = MagicMock()
        mock_response.content = b'generated image data'
        mock_get.return_value = mock_response
        
        image_data = {'url': 'https://example.com/image.png'}
        output_path = Path(self.temp_dir) / 'test_image.png'
        
        success = save_image(image_data, output_path)
        
        self.assertTrue(success)
        self.assertTrue(output_path.exists())
        self.assertEqual(output_path.read_bytes(), b'generated image data')
    
    def test_save_image_from_base64(self):
        """测试从base64保存图片"""
        # 创建测试图片数据
        test_image_data = b'test image content'
        base64_data = base64.b64encode(test_image_data).decode('utf-8')
        
        image_data = {'b64_json': base64_data}
        output_path = Path(self.temp_dir) / 'test_image.png'
        
        success = save_image(image_data, output_path)
        
        self.assertTrue(success)
        self.assertTrue(output_path.exists())
        self.assertEqual(output_path.read_bytes(), test_image_data)
    
    @patch('generate_image.requests.post')
    @patch('generate_image.requests.get')
    def test_complete_workflow(self, mock_get, mock_post):
        """测试完整工作流程"""
        # 模拟API响应
        mock_api_response = MagicMock()
        mock_api_response.status_code = 200
        mock_api_response.json.return_value = {
            'data': [{'url': 'https://example.com/generated.png'}]
        }
        mock_post.return_value = mock_api_response
        
        # 模拟图片下载响应
        mock_download_response = MagicMock()
        mock_download_response.content = b'generated image data'
        mock_get.return_value = mock_download_response
        
        # 1. 获取环境配置
        config = get_env_config()
        
        # 2. 生成优化提示词
        optimized_prompt = generate_prompt_with_nano_banana(self.prompt)
        
        # 3. 调用API生成图片
        api_result = call_image_generation_api(config, optimized_prompt)
        
        # 4. 保存图片
        if api_result and 'data' in api_result:
            image_data = api_result['data'][0]
            output_path = Path(self.temp_dir) / 'final_image.png'
            success = save_image(image_data, output_path)
            
            self.assertTrue(success)
            self.assertTrue(output_path.exists())
            self.assertEqual(output_path.read_bytes(), b'generated image data')
        else:
            self.fail("API调用失败")


def main():
    """主函数"""
    print("🧪 运行 generate_image.py 核心功能测试")
    print("=" * 50)
    
     # 设置必需环境变量
    os.environ['LLM_BASE_URL'] = 'https://api.test.com/v1'
    os.environ['LLM_MODEL'] = 'test-model'
    # 测试配置
    self.config = {
        'base_url': 'https://api.test.com/v1',
        'model': 'test-model',
        'api_key': 'test-key'
    }
     # 3. 调用API生成图片
    api_result = call_image_generation_api(config, optimized_prompt)
    
    


if __name__ == "__main__":
    sys.exit(main())