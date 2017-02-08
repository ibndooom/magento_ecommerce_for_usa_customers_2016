# note: this should never truly be refernced since we are using relative assets
# http_path = "/skin/frontend/themeheros/business-cards-theme/"
# http_path = "/skin/frontend/themeheros/business-cards-theme/"
# css_dir = "/css"
# sass_dir = "/scss"
# images_dir = "/images"
# javascripts_dir = "/js"
# relative_assets = true
# sourcemap = true

# output_style = :compressed
# environment = :production


http_path = "/skin/frontend/themeheros/business-cards-theme/"
css_dir = "css"
sass_dir = "scss"
images_dir = "images"
# javascripts_dir = "js"
# by default fonts_dir = css_dir/fonts
fonts_dir = "fonts"

# The environment mode. Defaults to :production, can also be :development
environment = :development

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = (environment == :production) ? :compressed : :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# Indicates whether line comments should be added to compiled css that says where the selectors were defined.
# Defaults to false in production mode, true in development mode.
# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false

preferred_syntax = :scss


asset_cache_buster do |path, real_path|
  if File.exists?(real_path)
    pathname = Pathname.new(path)
    modified_time = File.mtime(real_path).strftime("%s")
    new_path = "%s/%s-%s%s" % [pathname.dirname, pathname.basename(pathname.extname), modified_time, pathname.extname]

    {:path => new_path, :query => nil}
  end
end

# this one for switching between production and dev versions of the website
# example for use:
#   .button { background: url( image_path('img.png') ); }
# this will return you:
#   .button { background: url('../images/img.png'); }

module Sass::Script::Functions
  def image_path(string)
    assert_type string, :String
    Sass::Script::String.new("../img/#{string.value}")
  end
  alias_method :"image-path",:image_path 
  declare :"image-path", :args => [:string]
end