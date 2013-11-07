module Cryptable
  def password=(password)
    write_attribute(:password, Digest::SHA256.hexdigest(password))
  end
end
