import { Zap, Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">NestBoost</span>
            </div>
            <p className="text-gray-600">
              Ship secure NestJS backends faster with production-ready templates and best practices.
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-gray-500 hover:text-green-600 hover:bg-green-50"
              >
                <a href="https://github.com/nestboost" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-gray-500 hover:text-green-600 hover:bg-green-50"
              >
                <a href="https://twitter.com/nestboost" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-gray-500 hover:text-green-600 hover:bg-green-50"
              >
                <a href="https://linkedin.com/company/nestboost" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-600 hover:text-green-600 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/docs" className="text-gray-600 hover:text-green-600 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/changelog" className="text-gray-600 hover:text-green-600 transition-colors">
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="text-gray-600 hover:text-green-600 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-600 hover:text-green-600 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/careers" className="text-gray-600 hover:text-green-600 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-green-600 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/faq" className="text-gray-600 hover:text-green-600 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/support" className="text-gray-600 hover:text-green-600 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/status" className="text-gray-600 hover:text-green-600 transition-colors">
                  Status
                </a>
              </li>
              <li>
                <a href="mailto:support@nestboost.com" className="text-gray-600 hover:text-green-600 transition-colors">
                  <Mail className="h-3 w-3 inline mr-1" />
                  Email Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2024 NestBoost. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <a href="/privacy" className="text-gray-500 hover:text-green-600 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-500 hover:text-green-600 transition-colors">
              Terms of Service
            </a>
            <a href="/cookies" className="text-gray-500 hover:text-green-600 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
